export default function Logo({
  size = 48,
  lColor = 'currentColor',
}: {
  size?: number;
  lColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <text
        x="5"
        y="48"
        fontFamily="Playfair Display, serif"
        fontSize="48"
        fontWeight="700"
      >
        <tspan fill="#C41E2A">A</tspan>
        <tspan fill={lColor} dx="-12">
          L
        </tspan>
      </text>
    </svg>
  );
}
