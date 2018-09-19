import PropTypes from 'prop-types';

/*
  Check will give a console warning when an api response doesn't match the schema.
*/
export const check = (schema, api = 'Api') => data => {
  if (schema) {
    PropTypes.checkPropTypes(schema, data, 'api response prop', api);
  }
  return data;
};

export const unpackResponse = response => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
};
