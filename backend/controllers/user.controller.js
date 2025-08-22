const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => 
{
    try 
    {
        const users = await User.find({}, '-passwordHash');
        res.json(users);
    } catch (error) 
    {
      console.error(error);
      res.status(500).json({ message: 'erreur serveur'});
    }
};

exports.createUser = async (req, res) =>
    {
        try
        {
            const { firstName, lastName, email, phone, password, role } =req.body;

            if (!email || !password)
            {
                return res.status(400).json({ message: "email ou mot de passe requis"});
            }

            const existing = await User.findOne({ email });
            if (existing)
            {
                return res.status(400).json({ message: "un utiisateur avec cet email existe"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User
            (
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                    passwordHash: hashedPassword,
                    role : role || "gestionnaire",
                    verified: true
                }
            );

            

            await user.save();
            res.status(201).json({ message: "utilisateur créé", user: { ...user.toObject(), passwordHash: undefined } });
        } catch (error)
        {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }; 

exports.update = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Utilisateur mis à jour' });
};

exports.deleteUser = async (req, res) => 
{
    try 
    {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)
        {
            return res.status(404).json({ message: 'utilisateur non trouvé' });
        }
        res.json({ message: 'utilisateur supprimé' });
    } catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: 'erreur serveur' });
    }
};

exports.getMe = async (req, res) => 
{
    try 
    {
        const user = await User.findById(req.user._id, '-passwordHash').populate('markets');
        if (!user) 
        {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
