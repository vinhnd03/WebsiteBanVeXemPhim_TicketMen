package nhom3.datn.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import nhom3.datn.dao.AccountDao;
import nhom3.datn.entity.Account;
import nhom3.datn.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{
    @Autowired
    AccountDao dao;

    @Override
    public Account findById(String username) {
        return dao.findById(username).get();
    }   

}
