import { LandingRating } from "@/components/page-ui/rating/LandingRating";
import {
  LandingAvatar,
  SocialProofItem,
} from "@/components/page-ui/social-proof/LandingAvatar";
import clsx from "clsx";

/**
 * Shows social proof with avatars, number of users and an optional rating.
 *
 * Use this to show proof of existing, happy customers & increase trust.
 */
export const LandingSocialProof = ({
  children,
  className,
  avatarItems,
  numberOfUsers = 100,
  suffixText = "happy users",
  showRating,
  disableAnimation,
}: {
  children?: React.ReactNode;
  className?: string;
  avatarItems: SocialProofItem[];
  numberOfUsers: number;
  suffixText?: string;
  showRating?: boolean;
  disableAnimation?: boolean;
}) => {
  const numberText =
    numberOfUsers > 1000
      ? `${(numberOfUsers / 1000).toFixed(0)}k`
      : `${numberOfUsers}`;

  return (
    <div className={clsx("group flex flex-wrap gap-2", className)}>
      <div className={clsx("flex gap-1")}>
        {avatarItems.map((avatarItem, index) => (
          <LandingAvatar
            key={index}
            imageSrc={avatarItem.imageSrc}
            name={avatarItem.name}
            className={clsx(
              "relative",
              !disableAnimation
                ? "transition-all duration-300 md:group-hover:-ml-0.5"
                : "",
              index === 1 || index === 2 ? `-ml-4` : "",
              index === 3 ? `-ml-5` : "",
              index > 3 ? `-ml-6` : "",
            )}
          />
        ))}

        <div
          className={clsx(
            !disableAnimation
              ? "transition-all duration-300 md:group-hover:-ml-0.5"
              : "",
            "border-primary-100 bg-primary-100 relative -ml-5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-solid text-xs text-gray-900 dark:text-gray-900",
          )}
        >
          {numberText}+
        </div>
      </div>

      <div className="flex flex-col justify-center gap-1">
        {showRating ? <LandingRating /> : null}

        {!children ? (
          <p className="max-w-sm text-xs">
            from {numberText}+ {suffixText}
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
