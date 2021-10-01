/* eslint-disable import/prefer-default-export */

export const downloadCsv = (params) => {
  const { headers, data, fileName } = params;
  const parsedHeaders = headers.join(',');
  const parsedData = data
    .map((e) => {
      return e.join(',');
    })
    .join('\n');
  const results = `${parsedHeaders}\n${parsedData}\n`;
  const pom = document.createElement('a');
  const blob = new Blob([results], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  pom.href = url;
  const currentDate = new Date().toISOString().substring(0, 10);
  const downloadedFileName = () => {
    if (fileName) {
      return `Alphaveritas ${fileName} - ${currentDate}`;
    }
    return `Alphaveritas ${currentDate}`;
  };
  pom.setAttribute('download', `${downloadedFileName()}.csv`);
  pom.click();
};
