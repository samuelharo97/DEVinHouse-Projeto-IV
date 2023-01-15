export const fetchZipcode = async (e) => {
  const zipcode = e.target.value.replace(/\D/g, '');
  const res = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
  return res;
};
