import express from "express";
import User from "../models/userModels.js";
import { jwtAuthMiddleware, genrateJwtToken } from "../jwt/jsonWebToken.js";
import Candidate from "../models/candidate.js";

const router = express.Router();

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role === "admin") {
      return true;
    }
  } catch (err) {
    return false;
  }
};

// POST route to add a Candidate
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user does not have admin role" });

    const data = req.body; // Assuming the request body contains the candidate data

    // Create a new User document using the Mongoose model
    const newCandidate = new Candidate(data);

    // Save the new user to the database
    const response = await newCandidate.save();
    console.log("data saved");
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the person

router.put("/candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id)) {
      return res.status(403).json({ message: "user has not admin role" });
    }
    const candidateID = req.params.candidateID;
    const updatedCandidateData = req.body;

    const response = await Candidate.findByIdAndUpdate(
      candidateID,
      updatedCandidateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    console.log("Candidate data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/candidateID", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id)) {
      return res.status(403).json({ message: "user has not admin role" });
    }
    const candidateID = req.params.candidateID;

    const response = await Candidate.findByIdAndDelete(candidateID);

    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    console.log("Candidate data deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// for vote

router.post('/vote/:candidateID', jwtAuthMiddleware, async (req, res) => {
  const candidateID = req.params.candidateID;
  const userID = req.user.id;

  try {
    const candidate = await Candidate.findById(candidateID);
    console.log(candidate)
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.isVoted) {
      res.status(400).json({ message: "You have already voted" });
    }
    if (user.role == "admin") {
      res.status(403).json({ message: "admin is not allowed" });
    }

    // update candidate document to record the vote
    candidate.votes.push({ user: userID });
    candidate.voteCount++;
    await candidate.save();

    // Update the Candidate document to record
    user.isVoted = true;
    user.save();

    res.status(200).json({ message: "Vote recorded sucessfully" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/vote/count', async (req, res) => {
  try {
    // Find all candidates and sort them by voteCount in descending order
    const candidates = await Candidate.find().sort({ voteCount: -1 }); // Use -1 for descending order

    // Map the candidates to return only their party and vote count
    const voteRecord = candidates.map((data) => ({
      party: data.party,
      count: data.voteCount,
    }));

    // Send the vote record as a response
    res.status(200).json(voteRecord);
  } catch (error) {
    console.log(error); // Corrected to log 'error'
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get('/listcandidates', async(req, res) =>{

  try {
    // list of candidates
    const candidates = await Candidate.find({}, 'name party -_id');
      // Return the list of candidates
      res.status(200).json(candidates);
  } catch (error) {
    console.log(error); // Corrected to log 'error'
    res.status(500).json({ error: "Internal Server Error" });
  }
})

export default router;
