import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '../lib/utils'; // Ensure this path is correct

const ScrollArea = React.forwardRef((props, ref) => {
  return (
    <ScrollAreaPrimitive.Root ref={ref} {...props}>
      {/* Add your scroll area content here */}
    </ScrollAreaPrimitive.Root>
  );
});

export { ScrollArea };


