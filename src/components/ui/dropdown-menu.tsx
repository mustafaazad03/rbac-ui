import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Context for managing dropdown state
const DropdownContext = createContext<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
});

interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !contentRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef, contentRef }}>
      {children}
    </DropdownContext.Provider>
  );
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DropdownMenuTrigger({ children, asChild = false }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = useContext(DropdownContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const triggerProps = {
    ref: triggerRef,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    'aria-expanded': isOpen,
    'aria-haspopup': true,
    role: 'button',
    tabIndex: 0,
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps);
  }

  return <div {...triggerProps}>{children}</div>;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: 'start' | 'end' | 'center';
  className?: string;
}

export function DropdownMenuContent({ 
  children, 
  align = 'start',
  className = '' 
}: DropdownMenuContentProps) {
  const { isOpen, contentRef, triggerRef } = useContext(DropdownContext);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Update position when trigger element moves or window resizes
  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current?.getBoundingClientRect();
        
        let left = rect.left;
        if (align === 'end' && contentRect) {
          left = rect.right - contentRect.width;
        } else if (align === 'center' && contentRect) {
          left = rect.left + (rect.width - contentRect.width) / 2;
        }

        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: left + window.scrollX,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [align, isOpen, contentRef, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef as React.RefObject<HTMLDivElement>}
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in-0 zoom-in-95 ${className}`}
      style={{ top: position.top, left: position.left }}
      role="menu"
    >
      {children}
    </div>,
    document.body
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function DropdownMenuItem({ 
  children, 
  className = '',
  onClick,
  disabled = false 
}: DropdownMenuItemProps) {
  const { setIsOpen } = useContext(DropdownContext);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 ${
        disabled ? 'pointer-events-none opacity-50' : ''
      } ${className}`}
      role="menuitem"
      tabIndex={-1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}