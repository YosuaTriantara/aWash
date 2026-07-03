interface AvatarProps {
  name?: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClass = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

export default function Avatar({
  name = '',
  imageUrl,
  size = 'md',
}: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClass[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeClass[size]}
        rounded-full
        bg-blue-600
        text-white
        font-semibold
        flex
        items-center
        justify-center
        select-none
      `}
    >
      {initial || '?'}
    </div>
  );
}