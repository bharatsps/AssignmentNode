const Customer = require("../customers.json");

/**
 * Description: Get Customers List By first_name and last_name into application
 * @param {filter} req
 * @param {*} res
 * @param {*} next
 */
exports.getCustomersList = async (req, res, filter) => {
  try {
    return ( 
        getCustomersList = await Customer.filter(
      (customer) =>
        customer.first_name == filter || customer.last_name == filter
    ));
  } catch (error) {
    res.status(201).json({ status: 500, message: "error!", error: error });
  }
};

/**
 * Description:Get Customers List by first_name ,last_name car_make gender  into application
 * @param {first_name last_name sort car_make limit page} req
 * @param {*} res
 * @param {*} next
 */
exports.getCustomers = async (req, res, param) => {
  try {
    let getCustomersData, sortedData, getCustomers;
    if (param.gender && param.car_make) {
      getCustomers = Customer.filter((customer) => {
        return (
          customer.gender === param.gender &&
          customer.car_make === param.car_make
        );
      });
    } else if (param.gender && !param.car_make) {
      getCustomers = Customer.filter((customer) => {
        return customer.gender === param.gender;
      });
    } else {
      getCustomers = Customer.filter((customer) => {
        return customer.car_make === param.car_make;
      });
    }

    if (param.sort) {
      let splitData = param.sort.split(":");
      let filter = "";
      if (splitData[1] == "DESC") {
        filter = `-${splitData[0]}`;
      } else {
        filter = `${splitData[0]}`;
      }

      if (getCustomers.length > 0) {
        sortedData = getCustomers.sort(dynamicSortMultiple(filter));
      } else {
        sortedData = [];
      }
    }

    if (param.page || param.limit) {
      const start = (param.page - 1) * param.limit;
      const end = param.page * param.limit;

      if (sortedData) {
        getCustomersData = sortedData.slice(start, end);
        return getCustomersData;
      } else {
        if (getCustomers.length > 0) {
          getCustomersData = getCustomers.slice(start, end);
          return getCustomersData;
        } else {
          getCustomersData = [];
          return getCustomersData;
        }
      }
    } else {
      if (sortedData) {
        return sortedData;
      } else {
        if (getCustomers.length > 0) {
          return getCustomers;
        } else {
          return Customer;
        }
      }
    }
  } catch (error) {
    res.status(201).json({ status: 500, message: error });
  }
};

function dynamicSortMultiple() {
  var props = arguments;
  return function (obj1, obj2) {
    var i = 0,
      result = 0,
      numberOfProperties = props.length;
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }
    return result;
  };
}

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
