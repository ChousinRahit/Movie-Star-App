const truncate = (limit, textToTruncate) => {
  return textToTruncate?.length > limit
    ? textToTruncate.substr(0, limit) + '…'
    : textToTruncate;
};

export default truncate;
