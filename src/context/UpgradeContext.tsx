import { useEffect, useState, type ReactNode } from "react"
import type React from "react"
import { useNavigate } from "react-router-dom";
import { UpgradeModal } from "../components/shared/UpgradeSubscriptionModal";
import { UpgradeModalContext } from './CreateUpgradeContext'

export let globalShow: (() => void) | null = null



const UpgradeContext: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [isVisible, setisVisible] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        globalShow = () => setisVisible(true)
        return () => {
            globalShow = null
        };
    }, []);

    const upgradeShow = () => setisVisible(true);
    const upgradeHide = () => setisVisible(false);

    const handleUpgrade = () => {
        upgradeHide()
        navigate('/subscriptions')
    }

    return (
        <UpgradeModalContext.Provider value={{ upgradeHide, upgradeShow }}>
            {children}
            {
                isVisible && <UpgradeModal
                    onClose={upgradeHide}
                    onUpgrade={handleUpgrade}
                />
            }
        </UpgradeModalContext.Provider>
    )
}

export default UpgradeContext