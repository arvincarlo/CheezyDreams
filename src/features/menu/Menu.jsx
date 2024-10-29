import { useLoaderData } from "react-router-dom";

import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza, index) => <MenuItem key={index} pizza={pizza}/>)}
    </ul>
  );
}

export async function loader(object) {
  const menu = getMenu();
  return menu;
}

export default Menu;
