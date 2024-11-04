import { FC } from 'react';

const BonALICECard: FC<{
  title: string;
  className?: string;
  subTitle1: string;
  subValue1: number;
  subTitle2: string;
  subValue2: string;
  onClick?: () => void;
  compact?: boolean;
  selected?: boolean;
  isNodeBonALICE?: boolean;
  inverted?: boolean;
}> = ({
  title,
  className,
  subTitle1,
  subValue1,
  subTitle2,
  subValue2,
  onClick,
  compact,
  selected,
  isNodeBonALICE,
  inverted,
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={`new-bounded-ALICE-card rounded-2xl p-[18px] flex-1 bg-primary-card flex flex-col 
        ${className} ${
        !inverted
          ? selected
            ? 'bg-primary-dark text-gray10 dark:bg-alice-primary-g2 dark:text-white'
            : onClick
            ? 'bg-primary-10-solid text-black hover:bg-primary-dark-500 dark:hover:bg-alice-primary-g dark:hover:text-white'
            : 'bg-primary-10-solid text-black'
          : 'bg-so-dark-gray-2 text-white'
      }`}
    >
      <div
        className={`text-inherit font-semibold flex w-full justify-between gap-1.5 items-center ${
          compact ? 'md:mb-3' : 'mb-4 md:mb-6'
        } 
        `}
      >
        <p className="text-inherit dark:text-inherit">{title}</p>
        <p className="text-inherit dark:text-inherit text-xs pt-[3px] font-medium">
          {isNodeBonALICE && '(Active Node)'}
        </p>
      </div>
      <span className="text-sm flex mb-0.5 md:mb-2 justify-between">
        <p className="text-inherit dark:text-inherit font-light">{subTitle1}</p>
        <p className="text-inherit dark:text-inherit font-medium">
          {subValue1}
        </p>
      </span>
      <span className="text-sm flex justify-between">
        <p className="text-inherit dark:text-inherit font-light">{subTitle2}</p>
        <p className="text-inherit dark:text-inherit font-medium">
          {subValue2}
        </p>
      </span>
    </div>
  );
};

export default BonALICECard;
