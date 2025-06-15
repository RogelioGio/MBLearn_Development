import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PortalToolTip = ({children, anchorRef, visible}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const portalRef = useRef(null);

    useEffect(() => {

        if(!anchorRef.current || !portalRef.current || !visible) return;


        const anchorRect = anchorRef.current.getBoundingClientRect();
        const portalRect = portalRef.current.getBoundingClientRect();

        const offset = 8;

        setPosition({
            top: anchorRect.bottom + offset + window.scrollY,
            left: anchorRect.left + (anchorRect.width - portalRect.width) / 2 + window.scrollX
        });
    },[anchorRef, visible]);

    if (!visible) return null;

    return createPortal(
        <div ref={portalRef} style={{ position: 'absolute', top: position.top, left: position.left, zIndex: 1000 }}
        className="font-text p-2 text-xs bg-tertiary text-white rounded-sm whitespace-nowrap absolute shadow-lg transition-opacity ease-in-out duration-1000">
            {children}
        </div>,
        document.body
    )
}
export default PortalToolTip;
