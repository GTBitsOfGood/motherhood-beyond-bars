import CheckboxText from "@components/molecules/CheckboxText";
import { AdditionalInfoField, Item } from "@lib/types/items";
import { addItem, deleteItem, editItem } from "db/actions/admin/Items";
import { getItems } from "db/actions/shared/Items";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FiCheck, FiEdit, FiPlus, FiTrash } from "react-icons/fi";

interface EditableItem extends Item {
  isEditing?: boolean;
  isNew?: boolean;
}

// TODO fix wrong highlight color on edit button
// Fix wrong highlight color on textboxes (also double check styles)
// Fix margin when 3 options
// Fix checkbox staying checked (plus turn into component)

const ItemManagement: React.FC = () => {
  const [items, setItems] = useState<EditableItem[]>([]);
  const nextId = useRef(0); // To generate unique temporary IDs for new items

  const sortItemsOnOnboarding = (items: EditableItem[]) => {
    return [
      ...items.filter((item) => item.onboardingOnly === true), 
      ...items.filter((item) => item.onboardingOnly === false)
    ]
  };

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems();

      const sortedFetchedItems = sortItemsOnOnboarding(fetchedItems);
      // Initialize items without editing flags
      setItems(sortedFetchedItems.map((item) => ({ ...item, isEditing: false })));
    };
    fetchItems();
  }, []);

  const handleAddNewItem = () => {
    // Generate a unique temporary ID for the new item
    const tempId = `temp-${nextId.current++}`;

    // Add a new item with isEditing and isNew flags
    setItems([
      ...items,
      {
        id: tempId,
        title: "",
        description: "",
        onboardingOnly: false,
        additionalInfo: [],
        isEditing: true,
        isNew: true,
      },
    ]);
  };

  const handleEditItem = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleSaveEdit = async (itemId: string) => {
    const itemToSave = items.find((item) => item.id === itemId);
    if (!itemToSave) return;

    if (itemToSave.isNew) {
      // Add new item
      const { isEditing, isNew, id, ...newItemData } = itemToSave;
      const newItem = await addItem(newItemData);
      // Update the item in the state with the new id and reset flags
      setItems(sortItemsOnOnboarding(
        items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                id: newItem.id,
                isEditing: false,
                isNew: false,
              }
            : item
        ))
      );
    } else {
      // Edit existing item
      const { isEditing, ...updatedItemData } = itemToSave;
      await editItem(itemId, updatedItemData);
      setItems(sortItemsOnOnboarding(
        items.map((item) =>
          item.id === itemId ? { ...item, isEditing: false } : item
        ))
      );
    }
  };

  const handleDiscardEdit = (itemId: string) => {
    const itemToDiscard = items.find((item) => item.id === itemId);
    if (!itemToDiscard) return;

    if (itemToDiscard.isNew) {
      // Remove new item
      setItems(items.filter((item) => item.id !== itemId));
    } else {
      // Reset editing flag
      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, isEditing: false } : item
        )
      );
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const itemToDelete = items.find((item) => item.id === itemId);
    if (!itemToDelete) return;

    if (itemToDelete.isNew) {
      // Remove new item
      setItems(items.filter((item) => item.id !== itemId));
    } else {
      // Delete existing item
      await deleteItem(itemId);
      setItems(items.filter((item) => item.id !== itemId));
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string,
    field: keyof Item
  ) => {
    const { value } = event.target;
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleOnboardingBooleanChange = (
    value: boolean,
    itemId: string
  ) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, ["onboardingOnly"]: value } : item
      )
    );
  }

  const handleAdditionalInfoChange = (
    itemId: string,
    infoIndex: number,
    field: keyof AdditionalInfoField,
    value: string
  ) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              additionalInfo:
                item.additionalInfo &&
                item.additionalInfo.map((info, j) =>
                  j === infoIndex ? { ...info, [field]: value } : info
                ),
            }
          : item
      )
    );
  };

  const handleDeleteInputBox = (itemId: string, infoIndex: number) => {
    setItems(
      items.map((item) =>
        item.id == itemId ? {
          ...item,
          additionalInfo:
            item.additionalInfo &&
            item.additionalInfo.filter((info, j) => j !== infoIndex)
        } : item
      )
    )
  }

  const handleAddInputBox = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              additionalInfo: [
                ...(item.additionalInfo || []),
                { boxTitle: "", placeholder: "" },
              ],
            }
          : item
      )
    );
  };

  const renderItemForm = (item: EditableItem) => {
    return (
      <div
        className="p-6 bg-white shadow-sm rounded-lg relative mb-6"
        style={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-md font-medium text-gray-700">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={item.title || ""}
            onChange={(e) => handleInputChange(e, item.id!, "title")}
            required
            className="w-64 bg-gray-100 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 rounded-md px-3"
          />
        </div>
        <div className="flex items-center space-x-4 mb-10">
          <label className="text-md font-medium text-gray-700">Subtitle</label>
          <input
            type="text"
            value={item.description || ""}
            onChange={(e) => handleInputChange(e, item.id!, "description")}
            className="w-64 bg-gray-100 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 rounded-md px-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          {item.additionalInfo?.map((info, infoIndex) => (
            <div key={infoIndex}>
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-md font-medium text-gray-700">
                  Box Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={info.boxTitle || ""}
                  onChange={(e) =>
                    handleAdditionalInfoChange(
                      item.id!,
                      infoIndex,
                      "boxTitle",
                      e.target.value
                    )
                  }
                  className="w-64 bg-gray-100 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 rounded-md px-3"
                />
                <button
                  onClick={() => handleDeleteInputBox(item.id!, infoIndex)}
                  className="text-gray-500 hover:text-red-600 p-2 rounded-md"
                >
                  <FiTrash size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-md font-medium text-gray-700">
                  Placeholder Text
                </label>
                <input
                  type="text"
                  value={info.placeholder || ""}
                  onChange={(e) =>
                    handleAdditionalInfoChange(
                      item.id!,
                      infoIndex,
                      "placeholder",
                      e.target.value
                    )
                  }
                  className="w-64 bg-gray-100 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 rounded-md px-3"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="justify-start items-center gap-[19px] inline-flex mb-6">
          <div className="text-black text-base font-normal font-['Open Sans']">Show In Onboarding Only?</div>
              <CheckboxText 
                onChange={(e) => handleOnboardingBooleanChange(e, item.id!)}
                label="Yes"
                value={item.onboardingOnly || false}
              />
        </div>

        <button
          onClick={() => handleAddInputBox(item.id!)}
          className="text-mbb-pink flex items-center mt-4"
        >
          <FiPlus className="mr-1" /> Add an Input Box
        </button>

        <div className="absolute top-4 right-4 flex space-x-3">
          <button
            onClick={() => handleSaveEdit(item.id!)}
            className="text-mbb-pink p-2 rounded-md"
          >
            <FiCheck size={20} />
          </button>
          <button
            onClick={() => handleDiscardEdit(item.id!)}
            className="text-gray-500 hover:text-red-600 p-2 rounded-md"
          >
            <FiTrash size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderItemDisplay = (item: EditableItem) => {
    return (
      <div
        className="p-6 mb-8 bg-white shadow-sm rounded-lg flex justify-between items-start"
        style={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-700">{item.description}</p>
          <div className="grid grid-cols-2 gap-x-2 mt-4">
            {item.additionalInfo?.map((info, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  {info.boxTitle || "N/A"}
                </label>
                <input
                  type="text"
                  placeholder={info.placeholder || ""}
                  className="w-full max-w-xs bg-gray-100 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10 rounded-md px-3"
                  disabled
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row space-x-3 ml-4">
          <button
            onClick={() => handleEditItem(item.id!)}
            className="text-gray-500 hover:text-blue-600 p-2 rounded-md"
          >
            <FiEdit size={20} />
          </button>
          <button
            onClick={() => handleDeleteItem(item.id!)}
            className="text-gray-500 hover:text-red-600 p-2 rounded-md"
          >
            <FiTrash size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 flex flex-col w-full h-screen overflow-y-auto mx-auto sm:w-[82%]">
      <h2 className="text-2xl font-bold mb-8">Item Management</h2>

      {items.map((item) => (
        <div key={item.id}>
          {item.isEditing ? renderItemForm(item) : renderItemDisplay(item)}
        </div>
      ))}

      {/* Add new item button */}
      <button
        onClick={handleAddNewItem}
        className="text-mbb-pink flex items-center mt-6"
      >
        <FiPlus className="mr-1" /> Add an Item
      </button>
    </div>
  );
};

export default ItemManagement;
