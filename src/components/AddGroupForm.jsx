import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "../feature/notesSlice";
import { predefinedColors } from "../utils/predefinedColors";

export const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

const AddGroupForm = ({ isShown, setIsShown }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [err, setErr] = useState({});

  const dispatch = useDispatch();

  const handleClick = () => {
    let newErrorState = {};
    let hasError = false;

    if (!groupName) {
      newErrorState.name = "Group Name is Required!";
      hasError = true;
    }

    if (!selectedColor) {
      newErrorState.color = "Please Select the Color!";
      hasError = true;
    }

    if (hasError) {
      setErr(newErrorState);
      return;
    }

    dispatch(addGroup({ name: groupName, color: selectedColor }));
    setSelectedColor(null);
    setGroupName("");
    setErr({});
    setIsShown(false);
  };

  return (
    isShown && (
      <div className=" fixed z-30 top-0 left-0 h-screen w-screen bg-white bg-opacity-45">
        <div className="flex w-full h-full justify-center items-center">
          <div className="w-[284px] h-[211px] md:w-[400px] md:h-[240px] lg:h-[317px] lg:w-[740px] bg-white rounded-lg border-2  p-4 md:p-6 lg:p-7">
            <div className="font-medium text-xl md:text-2xl lg:text-3xl lg:mt-6 mb-3">
              Create New Group
            </div>

            <div className="flex my-3 justify-between">
              <label
                className="font-medium text-sm md:text-xl lg:text-2xl"
                htmlFor="groupName"
              >
                Group Name
              </label>
              <div className="w-2/3 pl-1">
                <input
                  id="groupName"
                  type="text"
                  value={groupName}
                  className="w-full border-2 rounded-2xl px-2 text-sm md:text-base"
                  placeholder="Type text here...."
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <div className="h-2 w-full mb-2 lg:mb-4 text-xs md:text-md lg:text-lg text-red-800">
                  {err.name}
                </div>
              </div>
            </div>

            <div className="flex my-2 justify-between">
              <label
                className="font-medium text-sm md:text-xl lg:text-2xl"
                htmlFor="groupColor"
              >
                Group Color
              </label>
              <div className="w-2/3">
                <div className="flex justify-between w-full items-center">
                  {predefinedColors.map((color) => (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`lg:mr-2 h-4 w-4 md:h-6 md:w-6 lg:h-9 lg:w-9 rounded-full cursor-pointer ${
                        color.color
                      } ${
                        color.color === selectedColor?.color
                          ? "border-gray-600 border-2"
                          : ""
                      }`}
                      role="button"
                      aria-label={`Select ${color.name} color`}
                    ></div>
                  ))}
                </div>
                <div className="h-2 w-full mt-1 mb-2 lg:mb-4 text-xs md:text-md lg:text-lg text-red-800">
                  {err.color}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end mt-4">
              <div className="flex justify-around w-3/5 lg:w-2/5">
                <button
                  className="text-red-800 hover:opacity-90 text-sm lg:text-base font-bold mr-4"
                  onClick={() => {
                    setErr({});
                    setSelectedColor(null);
                    setGroupName("");
                    setIsShown(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="border text-sm lg:text-base text-white rounded-lg px-3 py-1 bg-[#001F8B] hover:bg-opacity-90"
                  onClick={handleClick}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddGroupForm;
