export const parseArgv = (argv) => {
  const result = {};
  const items = argv.filter((arg) => arg.startsWith('--'));
  items.forEach((item) => {
    const [property, value] = item.slice(2).split('=');
    result[property] = value;
  });
  return result;
};
