import axios from 'axios';

const fetchItems = async (endPoint) => {
  console.log('[iam in fetch Items]');

  try {
    const res = await axios.get(endPoint);
    const movies = res.data.results;
    const page = res.data.page;
    return { movies, page };
  } catch (err) {
    return new Error(err);
  }
};

export default fetchItems;
