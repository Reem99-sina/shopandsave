import { JSX } from "react";

/**
 * @param obj an object that needs to get the value out of it
 * @param accessor the accessor to get the value out of the object, format is: string.string.string
 * @returns value of the accessor out of the object
 */
export const getValueByAccessor = (
  // TODO: remove any from here!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  accessor: string,
): JSX.Element | string | number => {
  const properties = accessor.split('.');

  let value = { ...obj };

  for (const property of properties) {
    value = value[property];

    if (value === undefined || value === null) {
      break;
    }
  }

  return value || accessor;
};
