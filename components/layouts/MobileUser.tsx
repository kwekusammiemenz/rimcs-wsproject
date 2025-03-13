import Link from "next/link";
import { IoLogIn } from "react-icons/io5";

const callsToAction = [
  { name: "Login", href: "#", icon: IoLogIn },
  //{ name: "Contact sales", href: "#", icon: PhoneIcon },
];

export const MobileUser = () => {
  return (
    <div className="py-6">
      {[...callsToAction].map((item) => (
        <Link
          key={item.name}
          href={item.href}
          //   aria-current={item.current ? "page" : undefined}
          //   className={classNames(
          //       item.current
          //           ? "bg-gray-900 text-white"
          //           : "text-gray-300 hover:bg-gray-700 hover:text-white"

          //   )}
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
