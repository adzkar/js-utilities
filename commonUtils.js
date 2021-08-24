export const timeoutFunc = (timeout, action, delay) => {
  clearTimeout(timeout);
  return setTimeout(() => {
    action();
  }, delay);
};

export const getNickName = (name) => {
  const x = name?.match(/\b\w/g) || [];
  return ((x.shift() || "") + (x.pop() || "")).toUpperCase();
};

export function numberFormatter(x) {
  if (x !== null && x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return x;
}

export function toRupiah(x) {
  return `Rp${numberFormatter(x)}`;
}

export const isObjectEmpty = (value) => {
  return (
    Object.prototype.toString.call(value) === "[object Object]" &&
    JSON.stringify(value) === "{}"
  );
};

export const byteToSize = (bytes, decimals = 0) => {
  if (bytes === 0) return "0 Bytes";
  const formatted = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB"];
  const calculate = Math.floor(Math.log(bytes) / Math.log(formatted));

  return `${parseFloat((bytes / formatted ** calculate).toFixed(dm))} ${
    sizes[calculate]
  }`;
};

export const sortTable = (sorter) => {
  const sortData = sorter.constructor === Object ? [sorter] : sorter;
  if (sortData.length === 1 && !sortData[0].order) return null;
  const initialValue = {};
  sortData.sort().forEach((item) => {
    const key = item.field;
    const value = item.order === "ascend" ? "ASC" : "DESC";
    initialValue[key] = value;
  });
  return initialValue;
};

export const sortVariables = (sort) => {
  const initialValue = {};
  if (Array.isArray(sort)) {
    sort.forEach((a) => {
      Object.assign(initialValue, {
        [a.field]: a.order === "ascend" ? "ASC" : "DESC",
      });
    });
  } else {
    Object.assign(initialValue, {
      [sort.field]: sort.order === "ascend" ? "ASC" : "DESC",
    });
  }
  return initialValue;
};

export const filterEmptyObject = (value) => {
  const data = {};
  Object.keys(value).forEach((key) => {
    if (value[key]) {
      data[key] = value[key];
    }
  });
  return data;
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const analyzerAdvFilterToArray = (searchQuery) => {
  const array = Object.keys(searchQuery).map((key) => {
    return { filterName: key, filterValue: searchQuery[key] };
  });
  return array;
};

export const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export const sumByAttr = (params) => {
  const { dataSource = [], attr = "" } = params;
  const selectAttrs = attr.split(".");

  const total = dataSource.reduce((result, item) => {
    let selectedValue = item;
    selectAttrs.forEach((attrItem) => {
      selectedValue = selectedValue?.[attrItem] ?? 0;
    });
    result += parseFloat(selectedValue);
    return result;
  }, 0);

  return total;
};

export const arrToObj = (params) => {
  const { dataSource = [], attrKey = "" } = params;
  const result = {};
  dataSource.forEach((item) => {
    result[item[attrKey]] = item;
  });
  return result;
};
