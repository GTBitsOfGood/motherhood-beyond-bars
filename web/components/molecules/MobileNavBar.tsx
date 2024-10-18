import React, { useState } from "react";

import TopBar from "@components/logos/TopBar";
import SideBar from "@components/SideBar";

function MobileNavBar(props: any) {
  console.log(props.items);

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
        <TopBar 
            onNavToggle={() => {
                setIsOpen(true);
            }}
            title={
                // Use window.location.pathname instead of router.pathname because these pages not exist yet (router.pathname = "_ERROR" for now), 
                // but could be changed back to router.pathname in the future for consistency

                // Get the last word from the address, and use it as title
                // router.pathname
                window.location.pathname
                .split('/')
                .slice(-1)[0]
                .toUpperCase()}
        />

        {isOpen && 
            <>
                {/* Dark the original screen */}
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40"
                    onClick={() => setIsOpen(false)} 
                />

                <SideBar {...props}/>
            </>
        }
    </div>
  );
}

export default MobileNavBar;
