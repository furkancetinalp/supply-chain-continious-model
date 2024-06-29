/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiBarChart2,
  FiChevronDown,
  FiHome,
  FiPieChart,
  FiPlusSquare,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export const ShiftingDropDown = ({
  updateMainProduct,
  DeleteMainProduct,
  itemId,
}) => {
  return (
    <div className="w-55 inline h-10 bg-neutral-950 text-neutral-200 md:justify-center">
      <Tabs />
    </div>
  );
};

const Tabs = ({ updateMainProduct, DeleteMainProduct, itemId }) => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === 'number' && typeof val === 'number') {
      setDir(selected > val ? 'r' : 'l');
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit justify-center gap-2"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && (
          <Content
            dir={dir}
            selected={selected}
            updateMainProduct={updateMainProduct}
            DeleteMainProduct={DeleteMainProduct}
            itemId={itemId}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab ? 'text-neutral-950' : 'bg-neutral-800 text-gray-200'
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
};

const Content = ({
  selected,
  dir,
  updateMainProduct,
  DeleteMainProduct,
  itemId,
}) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="left-200 absolute top-[calc(100%_+_24px)] w-40 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === 'l' ? 100 : dir === 'r' ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <t.Component
                  updateMainProduct={updateMainProduct}
                  DeleteMainProduct={DeleteMainProduct}
                  itemId={itemId}
                />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById('overlay-content');

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)',
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

const Actions = ({ updateMainProduct, DeleteMainProduct, itemId }) => {
  return (
    <div className="grid grid-cols-1 gap-4 divide-x divide-neutral-700">
      <button
        onClick={() => {}}
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiPlusSquare className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Mass Production</span>
      </button>
      <button
        onClick={() => {
          updateMainProduct(itemId);
        }}
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiEdit className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Update</span>
      </button>
      <button
        onClick={() => {
          DeleteMainProduct(itemId);
        }}
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <FiTrash2 className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Delete</span>
      </button>
    </div>
  );
};

const TABS = [
  //   {
  //     title: "Products",
  //     Component: Products,
  //   },
  {
    title: 'Actions',
    Component: Actions,
  },
  //   {
  //     title: "Blog",
  //     Component: Blog,
  //   },
].map((n, idx) => ({ ...n, id: idx + 1 }));
