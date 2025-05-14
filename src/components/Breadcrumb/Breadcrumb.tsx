
import { Link, useLocation } from "react-router-dom";

const excludedPaths = [
  "a",
  "acl",
  "DLF Downtown_CHN",
  "buildingDetails",
  "ext",
];
const unclickablePaths = [
  "/"
];

// Decode URI, replace _ and -, capitalize words
const formatSegment = (segment: string) => {
  const decoded = decodeURIComponent(segment);
  return decoded
    .split(/[-_ ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const isMongoId = (segment: string) => /^[a-f\d]{24}$/i.test(segment);
const startsWithNumber = (segment: string) => /^\d/.test(segment);
const isEncoded = (segment: string) => decodeURIComponent(segment) !== segment;

const Breadcrumbs = () => {
  const location = useLocation();
  const fullPathSegments = location.pathname.split("/").filter(Boolean);

  let visibleSegments = fullPathSegments.filter((segment) => {
    const decoded = decodeURIComponent(segment);
    return !excludedPaths.includes(decoded);
  });

  const last = visibleSegments[visibleSegments.length - 1];
  if (last && (isMongoId(last) || startsWithNumber(last) || isEncoded(last))) {
    visibleSegments = visibleSegments.slice(0, -1);
  }

  return (
    <nav className="bg-gray-100 rounded-md p-2 text-lg w-full">
      <ul className="flex flex-wrap items-center space-x-2 text-gray-600">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>

        {visibleSegments.map((segment, index) => {
          const realIndex = fullPathSegments.findIndex(
            (x) => x === segment && !visibleSegments.slice(0, index).includes(x)
          );

          const to = `/${fullPathSegments.slice(0, realIndex + 1).join("/")}`;
          const isLast = index === visibleSegments.length - 1;
          const formatted = formatSegment(segment);
          const isUnclickable = unclickablePaths.includes(segment);

          return (
            <li key={to} className="flex items-center space-x-2">
              <span className="text-gray-400">›</span>
              {isLast || isUnclickable ? (
                <span
                  className={`${isLast ? "text-gray-900 font-semibold" : "text-gray-500"}`}
                >
                  {formatted}
                </span>
              ) : (
                <Link to={to} className="text-blue-600 hover:underline">
                  {formatted}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
