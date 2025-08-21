import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardthunks } from '../../features/Dashboard/reducers/thunks';
import { selectDashboardData } from '../../features/Dashboard/reducers/selectors';
import { GetLocalStorage } from '../../utils/localStorage';

const Bar = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedType, setSelectedType] = useState<'Revenue' | 'Expense'>('Revenue');



    const dispatch = useDispatch<any>()

    const DashboardData = useSelector(selectDashboardData)

    useEffect(() => {
        const paramsData = { branch: GetLocalStorage("selectedBranchId") }
        dispatch(getDashboardthunks(paramsData));
    }, [dispatch]);

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
    const maxValue = Math.ceil(rawMax / 1000) * 1000;

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', {
            // style: 'currency',
            // currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);

    return (
        <div className="w-full p-5">
            <div className="py-3">
                <div className="flex justify-between mb-10">
                    <button
                        className={`px-5 py-1 rounded-full font-semibold border-2 ${selectedType === 'Revenue'
                            ? 'text-white bg-[#0AA2AC] border-[#0AA2AC]'
                            : 'text-[#0AA2AC] border-[#0AA2AC]'
                            }`}
                        onClick={() => setSelectedType('Revenue')}
                    >
                        Revenue
                    </button>
                    <button
                        className={`px-5 py-1 rounded-full font-semibold border-2 ${selectedType === 'Expense'
                            ? 'text-white bg-[#0AA2AC] border-[#0AA2AC]'
                            : 'text-[#0AA2AC] border-[#0AA2AC]'
                            }`}
                        onClick={() => setSelectedType('Expense')}
                    >
                        Expense
                    </button>
                </div>

                <div className="relative w-full h-[310px] border-gray-300 pb-5 left-12">
                    {Array.from({ length: 6 }, (_, i) => {
                        const val = maxValue - i * (maxValue / 5);
                        return (
                            <div
                                // key={val}
                                className="absolute left-3 w-full"
                                style={{ bottom: `${(val / maxValue) * 100}%` }}
                            >
                                <span
                                    className={`absolute text-sm text-gray-500 ${val === 0 ? '-left-10 bottom-[-12px]' : '-left-14'
                                        }`}
                                >
                                    {formatCurrency(val)}
                                </span>
                            </div>
                        );
                    })}

                    <div className="pl-8 pr-15 flex justify-between items-end gap-5 w-full">
                        {currentData.values.map((value: any, index: any) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="relative h-[300px] flex items-end">
                                    <IsometricBar
                                        value={value}
                                        maxValue={maxValue}
                                        color={currentData.colors[index]}
                                    />
                                </div>
                                <span className="text-xs mt-2 text-gray-700">
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
    color
}: {
    value: number;
    maxValue: number;
    color: string;
}) => {
    const chartHeight = 300;
    const height = (value / maxValue) * chartHeight;
    const width = 30;
    const depth = 15;

    const getLighterColor = (hex: string) => {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, ((num >> 16) & 0xff) + 40);
        const g = Math.min(255, ((num >> 8) & 0xff) + 40);
        const b = Math.min(255, (num & 0xff) + 40);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const lighterColor = getLighterColor(color);

    return (
        <div style={{ height: `${chartHeight}px`, display: 'flex', alignItems: 'flex-end' }}>
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
