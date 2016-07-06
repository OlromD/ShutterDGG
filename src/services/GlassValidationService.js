const isNumeric = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
export default function(dim){
  const validationProperties = {
    widthDivisor : 30,
    heightDivisor: 30
  },
  validationErrorAlert = {
    message: `Each glass dimension must be a number. Glass width must be divisible by ${validationProperties.widthDivisor} and glass height must be divisible by ${validationProperties.heightDivisor}.`,
    title : 'Dimensions are wrong.',
    buttons : [ { text : 'GOT IT!' }]
  };
  if (!isNumeric(dim.width) || !isNumeric(dim.height))
    return validationErrorAlert;
  if (dim.width % validationProperties.widthDivisor !== 0 || dim.height % validationProperties.heightDivisor !== 0)
    return validationErrorAlert;
  return null;
}
