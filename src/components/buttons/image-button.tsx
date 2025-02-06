import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion'
import Image from 'next/image'
interface ImageButtonProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  props?: unknown;
}

const ImageButton = ({
  src = "/images/stock/placeholder.png",
  alt = "Button image",
  onClick,
  className,
  variant = "default",
  size = "default",
  ...props
}: ImageButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      className="flex w-full justify-center"
    >
      <Button
        variant={variant}
        size={size}
        className={`p-0 overflow-hidden rounded-none bg-transparent hover:bg-transparent ${className}`}
        onClick={onClick}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </Button></motion.div>
  );
};

export default ImageButton;
