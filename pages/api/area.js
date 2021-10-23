/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  const url = `${process.env.RESTURL_API_SERVER}/option_area`;

  try {
    const response = await fetch(url);

    const getData = await response.json()

    var filterData = getData.filter(function (el) {
      return el.uuid !== null
    });

    return res.status(200).json(filterData);

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
