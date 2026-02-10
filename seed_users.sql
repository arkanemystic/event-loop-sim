-- Seed Data for Event-Loop-Sim
-- Generated automatically
-- Passwords are 'password123'

BEGIN;


    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_1', 'password123', 'driver', '555-000-0001')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_2', 'password123', 'driver', '555-000-0002')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_3', 'password123', 'driver', '555-000-0003')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_4', 'password123', 'driver', '555-000-0004')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_5', 'password123', 'driver', '555-000-0005')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_6', 'password123', 'driver', '555-000-0006')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_7', 'password123', 'driver', '555-000-0007')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_8', 'password123', 'driver', '555-000-0008')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_9', 'password123', 'driver', '555-000-0009')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    DO $$
    DECLARE new_user_id UUID;
    BEGIN
        INSERT INTO users (username, password, role, phone_number) 
        VALUES ('td_10', 'password123', 'driver', '555-000-0010')
        RETURNING id INTO new_user_id;

        INSERT INTO drivers (user_id, status, is_online) 
        VALUES (new_user_id, 'OFFLINE', false);
    END $$;
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_1', 'password123', 'passenger', '555-100-0001');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_2', 'password123', 'passenger', '555-100-0002');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_3', 'password123', 'passenger', '555-100-0003');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_4', 'password123', 'passenger', '555-100-0004');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_5', 'password123', 'passenger', '555-100-0005');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_6', 'password123', 'passenger', '555-100-0006');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_7', 'password123', 'passenger', '555-100-0007');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_8', 'password123', 'passenger', '555-100-0008');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_9', 'password123', 'passenger', '555-100-0009');
    
    INSERT INTO users (username, password, role, phone_number) 
    VALUES ('tp_10', 'password123', 'passenger', '555-100-0010');
    
COMMIT;
