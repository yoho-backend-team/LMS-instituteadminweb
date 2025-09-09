import { useContext } from "react"
import { UpgradeModalContext } from "../../context/CreateUpgradeContext";
import { globalShow } from '../../context/UpgradeContext'


export const useUpgradeWindow = () => {
    const context = useContext(UpgradeModalContext)
    if (!context) {
        throw new Error('useUpgradeModal must be used within an UpgradeModalProvider');
    }
    return context
}

export function showUpgradeWindow() {
    if (globalShow) {
        globalShow();
    } else {
        console.warn('Upgrade modal not mounted yet');
    }
}