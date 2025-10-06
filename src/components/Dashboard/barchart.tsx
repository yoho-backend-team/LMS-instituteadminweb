/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardthunks } from '../../features/Dashboard/reducers/thunks';
import { selectDashboardData } from '../../features/Dashboard/reducers/selectors';
import { GetLocalStorage } from '../../utils/localStorage';

const Bar = () => {
    const [selectedYear] = useState('2024');
    const [selectedType, setSelectedType] = useState<'Revenue' | 'Expense'>('Revenue');
    const [isMobile, setIsMobile] = useState(false);

    const dispatch = useDispatch<any>()
    const DashboardData = useSelector(selectDashboardData)

    useEffect(() => {
        const paramsData = { branch: GetLocalStorage("selectedBranchId") }
        dispatch(getDashboardthunks(paramsData));
    }, [dispatch]);

    // Check for mobile screen
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const annualData: any = {
        '2024': {
            Revenue: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                values: DashboardData?.revenue || [],
                colors: Array(12).fill('#0AA2AC')
            },
            Expense: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                values: DashboardData?.expenses || [],
                colors: Array(12).fill('#0AA2AC')
            }
        }
    };

    const currentData = annualData[selectedYear][selectedType];
    const rawMax = Math.max(
        ...annualData[selectedYear].Revenue.values,
        ...annualData[selectedYear].Expense.values
    );
    const maxValue = Math.ceil(rawMax / 1000) * 1000 || 1000; // Fallback to 1000 if no data

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0
        }).format(value);

    return (
        <div className="w-full p-3 sm:p-5">
            <div className="py-3">
                {/* Buttons - Responsive */}
                <div className="flex justify-between mb-6 sm:mb-10 gap-2">
                    <button
                        className={`px-3 sm:px-5 py-1 sm:py-2 rounded-full font-semibold border-2 text-sm sm:text-base ${selectedType === 'Revenue'
                            ? 'text-white bg-[#0AA2AC] border-[#0AA2AC]'
                            : 'text-[#0AA2AC] border-[#0AA2AC]'
                            }`}
                        onClick={() => setSelectedType('Revenue')}
                    >
                        Revenue
                    </button>
                    <button
                        className={`px-3 sm:px-5 py-1 sm:py-2 rounded-full font-semibold border-2 text-sm sm:text-base ${selectedType === 'Expense'
                            ? 'text-white bg-[#0AA2AC] border-[#0AA2AC]'
                            : 'text-[#0AA2AC] border-[#0AA2AC]'
                            }`}
                        onClick={() => setSelectedType('Expense')}
                    >
                        Expense
                    </button>
                </div>

                {/* Chart Container - Responsive */}
                <div className={`relative w-full ${isMobile ? 'h-[200px]' : 'h-[310px]'} border-gray-300 pb-5 ${isMobile ? 'left-6' : 'left-12'}`}>
                    {/* Y-axis labels */}
                    {Array.from({ length: isMobile ? 4 : 6 }, (_, i) => {
                        const val = maxValue - i * (maxValue / (isMobile ? 3 : 5));
                        return (
                            <div
                                key={i}
                                className="absolute left-3 w-full"
                                style={{ bottom: `${(val / maxValue) * 100}%` }}
                            >
                                <span
                                    className={`absolute text-xs sm:text-sm text-gray-500 ${val === 0 ? (isMobile ? '-left-6 bottom-[-8px]' : '-left-10 bottom-[-12px]') : (isMobile ? '-left-8' : '-left-14')
                                        }`}
                                >
                                    {formatCurrency(val)}
                                </span>
                            </div>
                        );
                    })}

                    {/* Bars Container */}
                    <div className={`pl-8 pr-4 flex justify-between items-end ${isMobile ? 'gap-1' : 'md:gap-3 lg:gap-4'} w-full overflow-x-auto`}>
                        {currentData.values.map((value: any, index: any) => (
                            <div key={index} className="flex flex-col items-center flex-shrink-0">
                                <div className={`relative ${isMobile ? 'h-[180px]' : 'h-[300px]'} flex items-end`}>
                                    <IsometricBar
                                        value={value}
                                        maxValue={maxValue}
                                        color={currentData.colors[index]}
                                        isMobile={isMobile}
                                    />
                                </div>
                                <span className="text-xs mt-2 text-gray-700 whitespace-nowrap">
                                    {currentData.labels[index]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const IsometricBar = ({
    value,
    maxValue,
    color,
    isMobile = false
}: {
    value: number;
    maxValue: number;
    color: string;
    isMobile?: boolean;
}) => {
    const [size, setSize] = useState({ 
        chartHeight: 300, 
        width: 30, 
        depth: 15 
    });

    // Handle responsive chart sizes
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 640) {
                // Mobile
                setSize({ chartHeight: 180, width: 16, depth: 8 });
            } else if (width >= 640 && width < 768) {
                // Small tablet
                setSize({ chartHeight: 200, width: 20, depth: 10 });
            } else if (width >= 768 && width < 1024) {
                // Tablet
                setSize({ chartHeight: 240, width: 24, depth: 12 });
            } else if (width >= 1024 && width < 1280) {
                // Laptop
                setSize({ chartHeight: 300, width: 30, depth: 15 });
            } else {
                // Desktop
                setSize({ chartHeight: 360, width: 36, depth: 18 });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { chartHeight, width, depth } = size;
    const height = Math.max((value / maxValue) * chartHeight, 2); // Minimum height for visibility

    const getLighterColor = (hex: string) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, ((num >> 16) & 0xff) + 40);
        const g = Math.min(255, ((num >> 8) & 0xff) + 40);
        const b = Math.min(255, (num & 0xff) + 40);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const lighterColor = getLighterColor(color);

    // Simplified version for very small screens
    if (isMobile && window.innerWidth < 400) {
        return (
            <div 
                style={{ 
                    height: `${chartHeight}px`, 
                    display: 'flex', 
                    alignItems: 'flex-end' 
                }}
            >
                <div
                    className="relative bg-[#0AA2AC] rounded-t-sm"
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        minHeight: '2px',
                    }}
                />
            </div>
        );
    }

    return (
        <div style={{ 
            height: `${chartHeight}px`, 
            display: 'flex', 
            alignItems: 'flex-end' 
        }}>
            <div
                className="relative"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(-30deg) rotateY(45deg)',
                    position: 'relative'
                }}
            >
                {/* Front face */}
                <div
                    className="absolute"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                        boxShadow: `inset 0 0 50px ${lighterColor}`,
                        transform: `translateZ(${depth}px)`,
                        transformOrigin: 'bottom'
                    }}
                />
                {/* Back face */}
                <div
                    className="absolute"
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                        transform: `translateZ(-${depth}px) rotateY(180deg)`,
                        transformOrigin: 'bottom'
                    }}
                />
                {/* Right face */}
                <div
                    className="absolute"
                    style={{
                        height: '100%',
                        width: `${depth * 2}px`,
                        backgroundColor: color,
                        transform: `rotateY(90deg) translateZ(${width / 2}px)`,
                        transformOrigin: 'bottom'
                    }}
                />
                {/* Left face */}
                <div
                    className="absolute"
                    style={{
                        height: '100%',
                        width: `${depth * 2}px`,
                        backgroundColor: color,
                        boxShadow: `inset 0 0 10px ${lighterColor}`,
                        transform: `rotateY(-90deg) translateZ(${width / 2}px)`,
                        transformOrigin: 'bottom'
                    }}
                />
                {/* Top face */}
                <div
                    className="absolute"
                    style={{
                        width: `${width}px`,
                        height: `${width}px`,
                        transform: 'rotateX(90deg) translateZ(0)',
                        bottom: '0px',
                        transformOrigin: 'center center',
                        border: `1px solid ${color}`,
                        boxShadow: `inset 0 0 6px ${lighterColor}`
                    }}
                />
            </div>
        </div>
    );
};

export default Bar;