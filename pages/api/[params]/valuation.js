/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  const { query: { params } } = req;

  const url = `${process.env.RESTURL_API_SERVER}/list`;

  try {
    const response = await fetch(url);

    const getData = await response.json()

    var filterData = getData.filter(function (el) {
      return el.uuid !== null &&
        el.komoditas === params
    });

    const print = {
      komoditas: params,
      max_price: Math.max(...filterData.map((item) => item.price)),
      min_price: Math.min(...filterData.map((item) => item.price)),
      max_size: Math.max(...filterData.map((item) => item.size)),
      min_size: Math.max(...filterData.map((item) => item.size)),

    }

    // const print = filterData.map((item)=> item.price)

    return res.status(200).json(print);

  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({
        status: response.statusText,
        message: response.data.message,
      })
      : res.status(400).json({ message: error.message });
  }
}
