import React, { useState, useEffect, useRef, createRef } from 'react';

const DropdownButton = ({ updateMainProduct, DeleteMainProduct, itemId }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  let bgColor = 'bg-gray-800';
  return <></>;
};
export default DropdownButton;
