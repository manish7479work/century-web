import { Avatar } from '@mui/material';
import logo from "../assets/century-icon.png"
import icon from "../assets/century-logo.png"
const x = "Manish Gupta"

const Header = () => {
  let logedInUserName;
  if (x.trim().split(" ").length == 1) {
    logedInUserName = x.trim() + " ."
  } else {
    logedInUserName = x;
  }

  return <div className="h-[65px] w-full flex items-center justify-between px-10  bg-white shadow-md">
    <Icon />
    <AvatarWthName name={logedInUserName} />
  </div>;
};

export default Header;

// export const Icon = () => {
//   return (
//     <div className='flex gap-2 h-full items-center'>
//       <div className='w-[80px]'>
//         <img src={logo} alt='logo' className='w-full' />
//       </div>
//       {/* |
//       <p className='text-xl font-bold p-0 m-0'>Pragyan</p> */}
//     </div>
//   )
// }


export const Icon = ({ isCollapsed }) => {
  return (
    <div className='flex gap-2 h-full items-center'>
      <div className={`${!isCollapsed ? "w-[160px]" : "w-[50px]"}`}>
        <img src={isCollapsed ? icon : logo} alt='logo' className='w-full' />
      </div>
      {/* |
      <p className='text-xl font-bold p-0 m-0'>Pragyan</p> */}
    </div>
  )
}

export const AvatarWthName = ({ name, isCollapsed }) => {

  return (
    <div className='flex gap-2 items-center'>

      <BackgroundLetterAvatars fullName={name} />
      {!isCollapsed && <p className='font-semibold'>{name.endsWith(".") ? name.slice(0, name.length - 1) : name}</p>}


    </div>
  )

  function BackgroundLetterAvatars({ fullName }) {
    function stringToColor(string) {
      let hash = 0;
      let i;

      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';

      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
    }

    function stringAvatar(name) {
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
    return (
      <Avatar {...stringAvatar(String(fullName))} />
    );
  }
}