export default function useValidation() {
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

  const validThai = new RegExp('^[\u0E00-\u0E7F.-]{1,}(s[\u0E00-\u0E7F.-]{1,}){0,2}?$');
  const validEng = new RegExp('^[a-zA-Z]+$');
  const validNumber = new RegExp('^[0-9]+$');

  return { validEmail, validThai, validEng, validNumber };
}

export const handleChangeTH = (e, setState) => {
  const validThai = new RegExp('^[\u0E00-\u0E7F.-]{1,}(s[\u0E00-\u0E7F.-]{1,}){0,2}?$');
  if (validThai.test(e.target.value) || e.target.value === '')
    setState((pre) => ({ ...pre, [e.target.name]: e.target.value }));
};

// handleChange for en
export const handleChangeEN = (e, setState) => {
  const validEng = new RegExp('^[a-zA-Z]+$');
  if (validEng.test(e.target.value) || e.target.value === '')
    setState((pre) => ({ ...pre, [e.target.name]: e.target.value }));
};

// handleChange for number
export const handleChangeNumber = (e, setState) => {
  const validNumber = new RegExp('^[0-9]+$');
  if (validNumber.test(e.target.value) || e.target.value === '')
    setState((pre) => ({ ...pre, [e.target.name]: e.target.value }));
};

// handleChang for All
export const handleChange = (name, value, setState) => {
  setState((pre) => ({ ...pre, [name]: value }));
};
