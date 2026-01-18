const express = require('express');
const Profile = require('../models/Profile');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Calculate profile completion percentage
const calculateCompletionPercentage = (profile) => {
  const fields = {
    ssc: ['institution', 'passingYear', 'grade', 'board'],
    hsc: ['institution', 'passingYear', 'grade', 'board'],
    bsc: ['institution', 'passingYear', 'grade', 'board'],
    msc: ['institution', 'passingYear', 'grade', 'board'],
  };

  let totalFields = 0;
  let filledFields = 0;

  // Count SSC fields
  fields.ssc.forEach((field) => {
    totalFields++;
    if (profile.ssc && profile.ssc[field] && profile.ssc[field].trim() !== '') {
      filledFields++;
    }
  });

  // Count HSC fields
  fields.hsc.forEach((field) => {
    totalFields++;
    if (profile.hsc && profile.hsc[field] && profile.hsc[field].trim() !== '') {
      filledFields++;
    }
  });

  // Count BSc fields
  fields.bsc.forEach((field) => {
    totalFields++;
    if (profile.bsc && profile.bsc[field] && profile.bsc[field].trim() !== '') {
      filledFields++;
    }
  });

  // Count MSc fields
  fields.msc.forEach((field) => {
    totalFields++;
    if (profile.msc && profile.msc[field] && profile.msc[field].trim() !== '') {
      filledFields++;
    }
  });

  // Count projects (minimum 1 project with all fields)
  if (profile.projects && profile.projects.length > 0) {
    const completeProjects = profile.projects.filter(
      (project) =>
        project.title &&
        project.title.trim() !== '' &&
        project.description &&
        project.description.trim() !== '' &&
        project.technologies &&
        project.technologies.trim() !== ''
    );
    if (completeProjects.length > 0) {
      filledFields += 4; // title, description, technologies, link
    }
  }
  totalFields += 4; // title, description, technologies, link

  const percentage = Math.round((filledFields / totalFields) * 100);
  return percentage;
};

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id }).populate(
      'user',
      'name email'
    );

    if (!profile) {
      // Create empty profile if doesn't exist
      profile = await Profile.create({ user: req.user._id });
    }

    const completionPercentage = calculateCompletionPercentage(profile);

    res.status(200).json({
      success: true,
      data: {
        profile,
        completionPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/profile
// @route   PUT /api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        {
          new: true,
          runValidators: false,
        }
      );
      await profile.populate('user', 'name email');
    } else {
      // Create new profile
      profile = await Profile.create({
        user: req.user._id,
        ...req.body,
      });
      await profile.populate('user', 'name email');
    }

    const completionPercentage = calculateCompletionPercentage(profile);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        profile,
        completionPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        {
          new: true,
          runValidators: false,
        }
      );
      await profile.populate('user', 'name email');
    } else {
      // Create new profile
      profile = await Profile.create({
        user: req.user._id,
        ...req.body,
      });
      await profile.populate('user', 'name email');
    }

    const completionPercentage = calculateCompletionPercentage(profile);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        profile,
        completionPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

