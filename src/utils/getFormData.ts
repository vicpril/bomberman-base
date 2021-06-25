export const getFormData = (formData: FormData) => [...formData.entries()]
  .reduce(
    (obj, pair) => Object.assign(obj, { [pair[0]]: pair[1] }), {},
  );
