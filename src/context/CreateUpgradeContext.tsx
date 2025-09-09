import { createContext } from "react";


interface UpgradeModalContextType {
    upgradeShow: () => void;
    upgradeHide: () => void;
}

export const UpgradeModalContext = createContext<UpgradeModalContextType | undefined>(undefined)
