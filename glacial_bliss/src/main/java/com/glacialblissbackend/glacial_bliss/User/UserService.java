package com.glacialblissbackend.glacial_bliss.User;

import com.glacialblissbackend.glacial_bliss.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String username, String email, String password){
        if(userRepository.findByUsernameOrEmail(username, email) != null) {
            throw new IllegalArgumentException("Username or Email Already Exists!");
        }

        String encodedPassword = passwordEncoder.encode(password);
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);

        return userRepository.save(newUser);
    }

    public User loginUser(String usernameOrEmail, String password) {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials!");
        }
        return user;
    }

    // Read/Get all users
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // Read/Get user by ID
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User not found!");
        }
        return user.get();
    }

    // Update user
    public User updateUser(Long id, String username, String email, String password) {
        User existingUser = getUserById(id);

        existingUser.setUsername(username);
        existingUser.setEmail(email);

        if (password != null && !password.isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(password));
        }

        existingUser.setId(id);

        return userRepository.save(existingUser);
    }

    // Delete user
    public void deleteUser(Long id) {
        User existingUser = getUserById(id);
        userRepository.delete(existingUser);
    }


    public void saveUser(User user) {
        userRepository.save(user);
    }
}
