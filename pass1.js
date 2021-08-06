const getPassword = (length, arg) => {
  length = document.getElementById("lengthInput").value || 16;
  arg = document.getElementById("specialInput").value || "~!@#$%^&*()_+-=[]{}|;:.,?><";
  if (length < 4) {
    updateView("passwordValue", "passwordValue", "", "P", "Length must be at least 4");
    return console.error("Length must be at least 4")
  } else if (length > 99) {
    updateView("passwordValue", "passwordValue", "", "P", "Length must be less then 100");
    return console.error("Length must be less then 100")
  }
  const lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const uppercase = lowercase.join("").toUpperCase().split("");
  const specialChars = arg.split("").filter(item => item.trim().length);
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hasNumber = false;
  let hasUpper = false;
  let hasLower = false;
  let hasSpecial = false;

  if (Number(length)) {
    length = Number(length)
  } else {
    return console.error("Enter a valid length for the first argument.")
  }

  let password = [];
  let lastChar;
  for (let i = 0; i < length; i++) {
    let char = newChar(lowercase, uppercase, numbers, specialChars);
    if (char !== lastChar) {
      password.push(char);
      lastChar = char
      if (Number(char)) {
        hasNumber = true
      }
      if (lowercase.indexOf(char) > -1) {
        hasLower = true
      }
      if (uppercase.indexOf(char) > -1) {
        hasUpper = true
      }
      if (specialChars.indexOf(char) > -1) {
        hasSpecial = true
      }
    } else {
      i--
    }
    if (i === length - 1 && (!hasNumber || !hasUpper || !hasLower || !hasSpecial)) {
      hasNumber = false;
      hasUpper = false;
      hasLower = false;
      hasSpecial = false;
      password = [];
      i = -1;
    }
  }

  function newChar(lower, upper, nums, specials) {
    let set = [lower, upper, nums, specials];
    let pick = set[Math.floor(Math.random() * set.length)];
    return pick[Math.floor(Math.random() * pick.length)]
  }
  updateView("passwordValue", "passwordValue", "", "P", password.join(""));
  updateView("copyPassword", "copyPassword", "", "button", "copy text");
  document.getElementById("copyPassword").addEventListener("click", copyPassword);
}

const copyPassword = () => {
  let text = document.getElementById("passwordValue").textContent;
  navigator.clipboard.writeText(text);
};

const updateView = (targetId, newId, label, element, method = '') => {
  let newElement = document.createElement(element);
  newElement.id = newId;
  let content = document.createTextNode(label + method);
  newElement.appendChild(content);

  let currentElement = document.getElementById(targetId);
  let parentElement = currentElement.parentNode;
  parentElement.replaceChild(newElement, currentElement);
}


