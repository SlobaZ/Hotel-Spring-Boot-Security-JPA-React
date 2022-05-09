package hotel.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import hotel.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room,Integer>{
	
	@Query("SELECT r FROM Room r WHERE "
			+ "(:name IS NULL or r.name like :name ) AND "
			+ "(:numberOfBeds IS NULL or r.numberOfBeds = :numberOfBeds ) AND "
			+ "(:free IS NULL or r.free = :free ) "
			)
	Page<Room> search(
			@Param("name") String name, 
			@Param("numberOfBeds") Integer numberOfBeds, 
			@Param("free") String free,
			Pageable pageRequest);

}
