import { useEffect, useRef }  from 'react'

const useIdleTimeout = (Idle, timeout = 10*1000, Exp) => {

    const idleTimer = useRef(null);

    const resetTimer = () => {
        if(idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(Idle, timeout);
        localStorage.setItem('LAST_ACTIVITY', Date.now());
    };

    useEffect(() => {
        const lastAtivity = localStorage.getItem('LAST_ACTIVITY');
        if(lastAtivity && Date.now() - lastAtivity > timeout){
            Idle();
        }

        const events = ['mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
        events.forEach(event => window.addEventListener(event, resetTimer));

        resetTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimer));
            if(idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, [Idle, timeout]);

}
export default useIdleTimeout;
