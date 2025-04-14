export async function validateOpenID(params: Record<string, string>) {
  try {
    const formData = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (key.startsWith("openid.")) {
        if (key === "openid.mode") {
          formData.append(key, "check_authentication");
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await fetch("https://steamcommunity.com/openid/login", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const text = await response.text();
    const isValid = text.includes("is_valid:true");

    return isValid;
  } catch (error) {
    console.error("Error validating OpenID with Steam:", error);
    return false;
  }
}
