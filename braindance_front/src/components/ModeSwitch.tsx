import { Dispatch } from "react"
import { MemoryButton } from "./MemoryButton";

export const ModeSwitch = ({
    creatorMode,
    setCreatorMode,
}: {
    creatorMode: boolean;
    setCreatorMode: Dispatch<boolean>;
}) => {
    return (
        <MemoryButton onClick={() => setCreatorMode(!creatorMode)}>
            {creatorMode ? "Diary Mode" : "Creator Mode"}
        </MemoryButton>
    )
}