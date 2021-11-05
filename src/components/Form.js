import React from "react";

export const Form = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await axios
      .post(
        "https://graphql-aord-api.herokuapp.com/graphql",
        {
          query: `
            mutation {
              createWord(wordInput:{wordName:"${form.wordName}"}) {
                wordName
                
               
              }
            }
            `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
        //
        if (result.status !== 200 && result.status !== 201) {
          throw new Error("Failed!");
        }
        dispatch(createWord(result));
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="AddWord__form">
      <h2>Form</h2>
      {console.log(form)}
      <form>
        <input
          type="text"
          name="wordName"
          placeholder="Word"
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
