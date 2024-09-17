import { cn } from "../lib/utils"
import Button  from "./Button"


const LoadingButton = ({ children, classCustomLoader , className, isDisabled= true }) => {

    return (
        <Button className={className} isDisabled={isDisabled}>
            <div className={cn("loader-button", classCustomLoader)} ></div>
            {children}
        </Button>
    )
}


export default LoadingButton
