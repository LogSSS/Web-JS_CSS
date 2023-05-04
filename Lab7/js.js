//
let info = "Write 'help()' to get help\n";

let helper =
  "<=============================================>\n" +
  "<             Instruction for App             >\n" +
  "<                                             >\n" +
  "<                 Use command                 >\n" +
  "<       triangle(data, type, data, type)      >\n" +
  "<=============================================>\n" +
  "<     For 'Type' fields available strings:    >\n" +
  "<   1) leg                                    >\n" +
  "<   2) hypotenuse                             >\n" +
  "<   3) angle                                  >\n" +
  "<   4) opposite angle                         >\n" +
  "<   5) adjacent angle                         >\n" +
  "<=============================================>\n" +
  "<     In 'Type' field available pairs is:     >\n" +
  "<   1) leg and leg                            >\n" +
  "<   2) leg and hypotenuse                     >\n" +
  "<   3) leg and opposite angle                 >\n" +
  "<   4) leg and adjacent angle                 >\n" +
  "<   5) hypotenuse and angle                   >\n" +
  "<   6) adjacent angle and opposite angle      >\n" +
  "<                 IN ANY ORDER                >\n" +
  "<=============================================>\n" +
  "<         For 'Data' fields available:        >\n" +
  "<      For angles only degree for other       >\n" +
  "<       numbers u can use floats or int       >\n" +
  "<=============================================>\n";

console.log(helper);

const button = document.getElementById("calculate");

function help() {
  console.log(helper);
}

button.addEventListener("click", function () {
  let data1 = document.getElementById("first").value.toLowerCase();
  let type1 = document.getElementById("first-type").value.toLowerCase();
  let data2 = document.getElementById("second").value.toLowerCase();
  let type2 = document.getElementById("second-type").value.toLowerCase();
  triangle(data1, type1, data2, type2);
});

function triangle(first, first_type, second, second_type) {
  console.log("<=============================================>");

  let type_valide = type_validator(first, first_type, second, second_type);
  if (type_valide) {
    console.log(type_valide);
    console.log(info);
    console.log("failed");
    return false;
  }

  let a, b, c, alpha, beta;
  [a, b, c, alpha, beta] = data_parser(first, first_type, second, second_type);

  let data_valide = data_validator(a, b, c, alpha, beta);
  if (data_valide) {
    console.log(data_valide);
    console.log(info);
    console.log("failed");
    return false;
  }

  [a, b, c, alpha, beta] = calculate(a, b, c, alpha, beta);
  alpha = (alpha * 180) / Math.PI;
  beta = (beta * 180) / Math.PI;

  console.log("a = " + a);
  console.log("b = " + b);
  console.log("c = " + c);
  console.log("alpha = " + alpha);
  console.log("beta = " + beta);
  console.log("success");
  return true;
}

function calculate(a, b, c, alpha, beta) {
  if (a !== undefined && b !== undefined) {
    c = Math.sqrt(a * a + b * b);
    alpha = Math.asin(a / c);
    beta = Math.asin(b / c);
    return [a, b, c, alpha, beta];
  }
  if (a !== undefined && c !== undefined) {
    b = Math.sqrt(c * c - a * a);
    alpha = Math.asin(a / c);
    beta = Math.asin(b / c);
    return [a, b, c, alpha, beta];
  }
  if (b !== undefined && c !== undefined) {
    a = Math.sqrt(c * c - b * b);
    alpha = Math.asin(a / c);
    beta = Math.asin(b / c);
    return [a, b, c, alpha, beta];
  }
  if (a !== undefined && alpha !== undefined) {
    b = a / Math.tan(alpha);
    c = a / Math.sin(alpha);
    beta = Math.asin(b / c);
    return [a, b, c, alpha, beta];
  }
  if (b !== undefined && alpha !== undefined) {
    a = b * Math.tan(alpha);
    c = b / Math.cos(alpha);
    beta = Math.asin(b / c);
    return [a, b, c, alpha, beta];
  }
  if (c !== undefined && alpha !== undefined) {
    a = c * Math.sin(alpha);
    b = c * Math.cos(alpha);
    beta = Math.asin(b / c);
    return [a, b, c, alpha, beta];
  }
  if (a !== undefined && beta !== undefined) {
    b = a * Math.tan(beta);
    c = a / Math.sin(beta);
    alpha = Math.asin(a / c);
    return [a, b, c, alpha, beta];
  }
  if (b !== undefined && beta !== undefined) {
    a = b / Math.tan(beta);
    c = b / Math.cos(beta);
    alpha = Math.asin(a / c);
    return [a, b, c, alpha, beta];
  }
  if (c !== undefined && beta !== undefined) {
    a = c * Math.sin(beta);
    b = c * Math.cos(beta);
    alpha = Math.asin(a / c);
    return [a, b, c, alpha, beta];
  }

  return [a, b, c, alpha, beta];
}

function data_parser(first, first_type, second, second_type) {
  let a, b, c, alpha, beta;
  if (first_type === "leg") a = first;
  if (second_type === "leg") b = second;
  if (first_type === "hypotenuse") c = first;
  if (second_type === "hypotenuse") c = second;
  if (first_type === "angle") alpha = first;
  if (second_type === "angle") alpha = second;
  if (first_type === "opposite angle" || second_type === "opposite angle") {
    if (first_type === "leg") alpha = second;
    if (second_type === "leg") beta = first;
    if (first_type === "adjacent angle") alpha = second;
    if (second_type === "adjacent angle") alpha = first;
  }
  if (first_type === "adjacent angle" || second_type === "adjacent angle") {
    if (first_type === "leg") beta = second;
    if (second_type === "leg") alpha = second;
    if (first_type === "opposite angle") beta = second;
    if (second_type === "opposite angle") beta = first;
  }

  if (alpha !== undefined) alpha = (alpha * Math.PI) / 180;

  return [a, b, c, alpha, beta];
}

function data_validator(a, b, c, alpha, beta) {
  let response = "";
  if (a !== undefined && a <= 0) response += "Leg must be more than 0\n";
  if (b !== undefined && b <= 0) response += "Leg must be more than 0\n";
  if (c !== undefined && c <= 0) response += "Hypotenuse must be more than 0\n";
  if (
    (alpha !== undefined && (alpha <= 0 || alpha >= 90)) ||
    (beta !== undefined && (beta <= 0 || beta >= 90))
  )
    response += "Angles must be between 1 and 89\n";
  else if (
    alpha !== undefined &&
    beta !== undefined &&
    parseFloat(alpha) + parseFloat(beta) !== 90.0
  )
    response += "Sum of angles must be 90 degrees\n";

  if (a !== undefined && c !== undefined && a >= c)
    response += "Leg must be less than hypotenuse\n";
  if (b !== undefined && c !== undefined && b >= c)
    response += "Leg must be less than hypotenuse\n";

  return response;
}

function type_validator(first, first_type, second, second_type) {
  let response = "";

  if (first === "") response += "First data is empty\n";
  else if (isNaN(first)) response += "First data is not a number\n";

  if (second === "") response += "Second data is empty\n";
  else if (isNaN(second)) response += "Second data is not a number\n";

  if (first_type === "") response += "First type is empty\n";
  else if (
    ![
      "leg",
      "hypotenuse",
      "angle",
      "opposite angle",
      "adjacent angle",
    ].includes(first_type)
  )
    response += "First type is not valid\n";

  if (second_type === "") response += "Second type is empty\n";
  else if (
    ![
      "leg",
      "hypotenuse",
      "angle",
      "opposite angle",
      "adjacent angle",
    ].includes(second_type)
  )
    response += "Second type is not valid\n";

  if (
    (first_type === "angle" && second_type !== "hypotenuse") ||
    (second_type === "angle" && first_type !== "hypotenuse")
  )
    response += "S1mple Angle must be with hypotenuse\n";

  if (
    (first_type === "opposite angle" &&
      !["leg", "adjacent angle"].includes(second_type)) ||
    (second_type === "opposite angle" &&
      !["leg", "adjacent angle"].includes(first_type))
  )
    response += "Opposite angle must be with leg or adjacent angle\n";

  if (
    (first_type === "adjacent angle" &&
      !["leg", "opposite angle"].includes(second_type)) ||
    (second_type === "adjacent angle" &&
      !["leg", "opposite angle"].includes(first_type))
  )
    response += "Adjacent angle must be with leg or opposite angle\n";

  if (
    (first_type === "hypotenuse" && !["leg", "angle"].includes(second_type)) ||
    (second_type === "hypotenuse" && !["leg", "angle"].includes(first_type))
  )
    response += "Hypotenuse must be with leg or s1mple angle\n";

  if (
    (first_type === "leg" &&
      !["leg", "hypotenuse", "adjacent angle", "opposite angle"].includes(
        second_type
      )) ||
    (second_type === "leg" &&
      !["leg", "hypotenuse", "adjacent angle", "opposite angle"].includes(
        first_type
      ))
  )
    response +=
      "Leg must be with leg, hypotenuse, adjacent angle or opposite angle\n";

  return response;
}
