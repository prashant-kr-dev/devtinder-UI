import { useState } from 'react';
import UserCard from './UserCard';
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {


    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        //Clear Errors
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            setError(err.response.data);
        }
    };
    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex h-screen justify-center mx-10">
                    <div className="card card-border bg-base-100 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">First Name :</label>
                                <input type="text" id="name" className="input" value={firstName} placeholder="First Name" required
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Last Name :</label>
                                <input type="text" id="name" className="input" value={lastName} placeholder="Last Name" required
                                    onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Photo Url :</label>
                                <input type="text" id="name" className="input" value={photoUrl} placeholder="Photo Url" required
                                    onChange={(e) => setPhotoUrl(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Age :</label>
                                <input type="text" id="name" className="input" value={age} placeholder="Age" required
                                    onChange={(e) => setAge(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Gender :</label>
                                <input type="text" id="name" className="input" value={gender} placeholder="Gender" required
                                    onChange={(e) => setGender(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">About :</label>
                                <input type="text" id="name" className="input" value={about} placeholder="About" required
                                    onChange={(e) => setAbout(e.target.value)} />
                            </fieldset>
                            <fieldset className="text-red-500">{error}</fieldset>
                            <div className="card-actions justify-center my-2">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            {
                showToast && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>Profile saved successfully.</span>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default EditProfile