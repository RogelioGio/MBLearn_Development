import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "MBLearn/src/axios-client";
import { Progress } from "MBLearn/src/components/ui/progress";
import { useEffect, useState } from "react";import { faArrowDownAZ, faArrowDownShortWide, faArrowUpAZ, faArrowUpWideShort, faFilter, faSearch, faSort, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectItem
} from "MBLearn/src/components/ui/select";
import { Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger, } from "MBLearn/src/components/ui/sheet";
import CourseCard from "../CourseCard";

const LearningJourney = ({  }) => {
    return(
        <div className="grid grid-cols-4 grid-rows-[min-content_1fr_min-content] w-full h-full">

        </div>
    )
}
export default LearningJourney;
