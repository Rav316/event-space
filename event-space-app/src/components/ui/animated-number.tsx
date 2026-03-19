import { useEffect, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from 'motion/react';

interface Props {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

export const AnimatedNumber: React.FC<Props> = ({
  value,
  decimals = 0,
  suffix = '',
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 180, damping: 35 });
  const display = useTransform(
    spring,
    (current) => `${current.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};
