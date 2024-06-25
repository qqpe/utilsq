/**
 *
 * @param {any} value  Value which will be tested
 * @returns Returns the result as boolean, true if given value is string, othwerwise false
 */
function isString(value: any): value is string {
  return typeof value === "string";
}

/**
 * Determine if given value is numeric
 * @param {any} value  Value which will be tested
 * @typedef {Object} options
 * @property {boolean} loose Accept strings that wraps a numeric, default to false
 * @property {boolean} excludeIntegers Excluding integer values, if true, integer values will result in false, default to false.
 * @property {boolean} excludeDoubles Excluding double values, if true, double values will result in false, default to false. WARNING: Numeric values that has only zero(s) after it's decimal point will be treated as an integer e.g. 1.0 to 1
 * @returns Returns the result as boolean, true if given value is met the expectations, othwerwise false.
 * @description Because the answer for "what is a number" is all over the place, this function accepts additional options parameter, which is exists to customize the definition of a "number" to your liking.
 */
function isNumeric(
  value: any,
  options: {
    loose?: boolean;
    excludeIntegers?: boolean;
    excludeDoubles?: boolean;
    symbols?: {
      command?:
        | "allowOnlyDots"
        | "allowOnlyCommas"
        | "allowBothDotsAndCommas"
        | "allowNone";
    };
  } = {}
): boolean {
  // Give default values to options parameter
  const {
    symbols = {
      command: "allowOnlyDots",
    },
  } = options;

  options.loose = options.loose ?? false;
  options.excludeIntegers = options.excludeIntegers ?? false;
  options.excludeDoubles = options.excludeDoubles ?? false;
  options.symbols = options.symbols ?? symbols;

  const iRegxp = /^(\d+)(?!.)/; // integer regxp
  const dRegxp = /^(\d+)[,.]\d+$/; // double regxp
  const numericOnlyDotsRegxp = /^((\d+)[.]?(\d+)?)+$/; // only none or more dotted regxp
  const numericOnlyCommasRegxp = /^((\d+)[,]?(\d+)?)+$/; // only none or more commas regxp
  const numericBothDotsAndCommasRegxp = /^((\d+)[.,]?(\d+)?)+$/; // only none or more (dots, commas) regxp
  const numericAcceptNone = /^\d+$/; // ! NOT TESTED: it should return only ints?

  // Prepare list of numeric regxps, only one command will test the string based on options.symbols.command
  const commandsAndRegxps = {
    allowOnlyDots: numericOnlyDotsRegxp,
    allowOnlyCommas: numericOnlyCommasRegxp,
    allowBothDotsAndCommas: numericBothDotsAndCommasRegxp,
    allowNone: numericAcceptNone,
  };

  // If type is not number or string return false
  if (typeof value !== "number" && typeof value !== "string") return false;

  //If both integers and doubles are excluded, return false
  if (options.excludeDoubles && options.excludeIntegers) return false;

  // create an empy conditions array
  let conditions = [];

  if (options.excludeDoubles)
    // if doubles are restricted
    conditions.push(!dRegxp.test(String(value)));
  else if (options.excludeIntegers) conditions.push(dRegxp.test(String(value))); // if doubles are allowed but integers are resttricted
  if (options.excludeIntegers)
    // if integers are restricted
    conditions.push(!iRegxp.test(String(value)));
  else if (options.excludeDoubles) conditions.push(iRegxp.test(String(value))); // if integers are allowed but doubles are resttricted

  // round the fraction part of the value (after dot) if given value is not NaN. If it is NaN, value probably is a string and includes one ore more comma (,)
  value =
    typeof value === "string"
      ? String(isNaN(Number(value)) ? value : Number(value))
      : Number(value);

  // return false if string value ends with comma (,)
  if (options.loose && typeof value === "string" && value.endsWith(","))
    return false;

  // Allow string type based on loose option
  if (options.loose)
    conditions.push(typeof value === "number" || typeof value === "string");
  else conditions.push(typeof value === "number");

  // Fire given | default command, typeof value must be string.
  if (options.loose && typeof value === "string") {
    const commandgRegxp =
      commandsAndRegxps[symbols?.command || "allowOnlyDots"];
    conditions.push(commandgRegxp.test(value));
  }

  // return a Boolea, true if every condition statment evaluates to true, false if any statment did evaluated to false
  return !conditions.includes(false);
}

export { isString, isNumeric };
