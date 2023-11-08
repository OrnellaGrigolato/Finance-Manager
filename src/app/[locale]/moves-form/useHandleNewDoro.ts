import baseUrl from "@/components/BaseUrl";

export const handleNewDorO = async (newDorO: string) => {
  let DoroS: [];
  fetch(`${baseUrl}/api/DorO`)
    .then((response) => response.json())
    .then((data) => {
      if (newDorO && !data.result?.includes(newDorO)) {
        fetch(`${baseUrl}/api/DorO`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newDorO }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
};

export const getNewDorOId = async (DorOName: string) => {
  if (DorOName != "") {
    try {
      const response = await fetch(`${baseUrl}/api/DorO/name/${DorOName}`);
      const data = await response.json();
      return data.result.id_DorO;
    } catch (error) {
      console.error(error);
    }
  }
};
